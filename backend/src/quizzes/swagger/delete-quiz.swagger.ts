import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';

export function ApiDeleteQuiz() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a quiz and its questions' }),
    ApiParam({ name: 'id', description: 'Quiz UUID' }),
    ApiNoContentResponse({ description: 'Quiz deleted successfully' }),
    ApiNotFoundResponse({ description: 'Quiz not found' }),
  );
}
