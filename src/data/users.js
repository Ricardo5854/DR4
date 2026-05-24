import { faker } from '@faker-js/faker/locale/pt_BR'

faker.seed(42)

export const users = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  job: faker.person.jobTitle(),
}))
