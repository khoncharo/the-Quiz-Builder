import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { QuizDetailDto } from '../dto/quiz-detail.dto';

export function ApiCreateQuiz() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new quiz with questions' }),
    ApiCreatedResponse({
      type: QuizDetailDto,
      description: 'Quiz created successfully',
    }),
    ApiBadRequestResponse({ description: 'Invalid request body' }),
  );
}
