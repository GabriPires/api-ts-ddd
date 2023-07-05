import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date('2021-01-02T00:00:00'),
      }),
    )

    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date('2021-01-01T00:00:00'),
      }),
    )

    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date('2021-01-04T00:00:00'),
      }),
    )

    const { questions } = await sut.execute({
      page: 1,
    })

    console.log(questions)

    expect(questions).toEqual([
      expect.objectContaining({
        createdAt: new Date('2021-01-04T00:00:00'),
      }),
      expect.objectContaining({
        createdAt: new Date('2021-01-02T00:00:00'),
      }),
      expect.objectContaining({
        createdAt: new Date('2021-01-01T00:00:00'),
      }),
    ])
  })

  it('should be able to fetch recent questions with pagination', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({
      page: 2,
    })

    expect(questions).toHaveLength(2)
  })
})
