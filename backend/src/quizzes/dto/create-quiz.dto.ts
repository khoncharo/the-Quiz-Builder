import {
  IsEnum,
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';

export class CreateQuestionDto {
  @ApiProperty({ enum: QuestionType, example: QuestionType.BOOLEAN })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({ example: 'Is the sky blue?' })
  @IsString()
  label: string;

  @ApiPropertyOptional({ type: [String], example: ['Red', 'Green', 'Blue'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  options?: string[];
}

export class CreateQuizDto {
  @ApiProperty({ example: 'General Knowledge' })
  @IsString()
  title: string;

  @ApiProperty({ type: [CreateQuestionDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
