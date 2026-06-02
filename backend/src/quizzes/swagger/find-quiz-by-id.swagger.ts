import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import { QuizDetailDto } from '../dto/quiz-detail.dto';

export function ApiFindQuizById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a quiz by ID with all questions' }),
    ApiParam({ name: 'id', description: 'Quiz UUID' }),
    ApiOkResponse({
      type: QuizDetailDto,
      description: 'Quiz returned successfully',
    }),
    ApiNotFoundResponse({ description: 'Quiz not found' }),
  );
}
