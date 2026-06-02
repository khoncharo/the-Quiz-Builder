import {
  IsEnum,
  IsString,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';

@ValidatorConstraint({ name: 'checkboxOptions' })
class CheckboxOptionsConstraint implements ValidatorConstraintInterface {
  public validate(options: string[], args: ValidationArguments): boolean {
    const { type } = args.object as CreateQuestionDto;
    if (type !== QuestionType.CHECKBOX) return true;
    return options.length > 0 && options.every((o) => o.trim().length > 0);
  }
  public defaultMessage(): string {
    return 'Checkbox questions require at least one non-empty option';
  }
}

export class CreateQuestionDto {
  @ApiProperty({ enum: QuestionType, example: QuestionType.BOOLEAN })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({ example: 'Is the sky blue?' })
  @IsString()
  label: string;

  @ApiPropertyOptional({ type: [String], example: ['Red', 'Green', 'Blue'] })
  @Transform(({ value }: { value: unknown }) => (value ?? []) as string[])
  @IsArray()
  @IsString({ each: true })
  @Validate(CheckboxOptionsConstraint)
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
