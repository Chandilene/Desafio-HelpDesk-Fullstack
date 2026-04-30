import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { measureMemory } from "vm";

class TicketsController {
  async create(request: Request, response: Response) {
    const { id: customer_id } = request.user as { id: string };

    const bodySchema = z.object({
      title: z
        .string()
        .trim()
        .min(5, "O título deve ter pelo menos 5 caracteres"),
      description: z
        .string()
        .trim()
        .min(10, "Escreva a descrição com mais detalhes"),
      technicianId: z.string().uuid("Selecione um técnico válido"),
      services: z
        .array(z.string().uuid())
        .min(1, "Selecione pelo menos um serviço"),
    });

    const { title, description, technicianId, services } = bodySchema.parse(
      request.body,
    );

    const technician = await prisma.user.findUnique({
      where: { id: technicianId },
    });

    if (!technician || technician.role !== "TECHNICIAN") {
      throw new AppError("Técnico inválido");
    }

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        customerId: customer_id,
        technicianId,

        services: {
          create: services.map((serviceId) => ({
            serviceId: serviceId,
          })),
        },
      },
      include: {
        technician: {
          select: {
            name: true,
          },
        },
        customer: {
          select: {
            name: true,
          },
        },
        services: {
          include: {
            service: true,
          },
        },
      },
    });

    const totalValue = ticket.services.reduce((soma: number, item: any) => {
      return soma + Number(item.service.price);
    }, 0);

    return response
      .status(201)
      .json({ ...ticket, totalValue: totalValue.toFixed(2) });
  }
  async index(request: Request, response: Response) {
    const { id: user_id, role } = request.user || {};

    let where = {};

    if (role === "CUSTOMER") {
      where = { customerId: user_id };
    } else if (role === "TECHNICIAN") {
      where = { technicianId: user_id };
    }

    const tickets = await prisma.ticket.findMany({
      where,
      include: {
        technician: {
          select: {
            name: true,
          },
        },
        customer: {
          select: {
            name: true,
          },
        },
        services: {
          include: {
            service: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return response.json(tickets);
  }

  async showDetails(request: Request, response: Response) {
    const { id } = request.params;

    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        technician: {
          select: { name: true, email: true, avatar: true },
        },
        customer: {
          select: { name: true },
        },
        services: {
          include: { service: true },
        },
      },
    });

    if (!ticket) {
      return response.status(404).json({ message: "Chamado não encontrado" });
    }

    return response.json(ticket);
  }

  async updateStatus(request: Request, response: Response) {
    const { id: user_id, role } = request.user as { id: string; role: string };
    const { id } = request.params;

    const bodySchema = z.object({
      status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"], {
        errorMap: () => ({
          message: "Status inválido. Use: OPEN, IN_PROGRESS ou CLOSED",
        }),
      }),
    });

    const { status } = bodySchema.parse(request.body);

    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      throw new AppError("Chamado não encontrado", 404);
    }

    if (role !== "ADMIN" && ticket.technicianId !== user_id) {
      throw new AppError(
        "Você não tem permissão para alterar o status desse chamado",
      );
    }

    await prisma.ticket.update({
      where: { id },
      data: { status },
    });

    return response.status(204).send();
  }

  async addService(request: Request, response: Response) {
    const { id } = request.params;
    const { id: user_id, role } = request.user as { id: string; role: string };

    const bodySchema = z.object({
      services: z
        .array(z.string().uuid())
        .min(1, "Selecione pelo menos um serviço"),
    });

    const { services } = bodySchema.parse(request.body);

    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      throw new AppError("Chamado não encontrado", 404);
    }

    if (role !== "ADMIN" && ticket.technicianId !== user_id) {
      throw new AppError(
        "Você nao tem autorização para adicionar serviços a esse chamado.",
      );
    }

    if (ticket.status === "CLOSED") {
      throw new AppError("Esse chamado ja está encerrado.");
    }

    await prisma.ticket.update({
      where: { id },
      data: {
        services: {
          create: services.map((serviceId) => ({
            serviceId: serviceId,
          })),
        },
      },
    });

    return response.status(201).json("Serviço adicionado com sucesso !");
  }

  async delete(request: Request, response: Response) {
    const { id: user_id, role } = request.user as { id: string; role: string };
    const { ticketServiceId } = request.params;

    const relation = await prisma.ticketService.findUnique({
      where: {
        id: ticketServiceId,
      },
      include: {
        ticket: true,
      },
    });

    if (!relation) {
      throw new AppError("Este registro de serviço não existe.", 404);
    }

    if (role !== "ADMIN" && relation?.ticket.technicianId !== user_id) {
      throw new AppError("Não autorizado");
    }

    await prisma.ticketService.delete({ where: { id: ticketServiceId } });

    return response.json("Serviço deletado com sucesso!");
  }
}

export { TicketsController };
