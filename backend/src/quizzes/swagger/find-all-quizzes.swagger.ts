import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { QuizSummaryDto } from '../dto/quiz-summary.dto';

export function ApiFindAllQuizzes() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all quizzes with question count' }),
    ApiOkResponse({
      type: [QuizSummaryDto],
      description: 'List of quizzes returned successfully',
    }),
  );
}
