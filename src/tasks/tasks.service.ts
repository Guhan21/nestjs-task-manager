import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { TaskStatus } from './tasks.status.enum';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {
    }

    public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    public async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;
    }

    public async deleteTaskById(id: number) {
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

    }

    public async updateTaskStatus(id: number, status: TaskStatus) {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

    public async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this.taskRepository.createTask(createTaskDTO);
    }

}
