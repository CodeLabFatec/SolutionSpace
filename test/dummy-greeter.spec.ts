import { greeter } from '@/dummy-greeter'

describe('Dummy greeter test', () => {
  it('should return a greeting to a specified name', () => {
    const name = 'Jane Doe'
    const res = greeter(name)

    expect(res).toStrictEqual(`Hello ${name}`)
  })
})
