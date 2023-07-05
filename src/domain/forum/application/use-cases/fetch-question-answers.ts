import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface FetchQuestionAnswersRequest {
  page: number
  questionId: string
}

interface FetchQuestionAnswersResponse {
  answer: Answer[]
}

export class FetchQuestionAnswers {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
    const answer = await this.answersRepository.findManyByQuestionId(
      questionId,
      {
        page,
      },
    )

    return { answer }
  }
}
