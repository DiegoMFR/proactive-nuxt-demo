import { z } from 'zod'

export const layoutType = z.enum(['list', 'grid'])

export function validateLayoutType(value: any): value is LayoutType {
  return layoutType.safeParse(value).success
}
