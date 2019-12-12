import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../tasks.status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
      ];
    transform(value: any) {
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        return this.allowedStatuses.some((allowedStatus) => allowedStatus === status);
    }
}
