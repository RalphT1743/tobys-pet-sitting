import {defineField, defineType} from 'sanity'

export const dogPhotoType = defineType({
  name: 'dogPhoto',
  title: 'Dog Photos',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      type: 'string',
      
    }),

    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'caption',
    },
  },
})