import {type SchemaTypeDefinition} from 'sanity'

import {dogPhotoType} from './dogPhotoType'
import {testimonialType} from './testimonialType'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [dogPhotoType, testimonialType],
}