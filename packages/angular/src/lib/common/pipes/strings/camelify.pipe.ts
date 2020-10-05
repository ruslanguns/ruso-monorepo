import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelify',
})
export class Camelify implements PipeTransform {
  transform(input: string): string {
    const trChars = {
      áÁ: 'a',
      éÉ: 'e',
      íÍ: 'i',
      óÓ: 'o',
      úÚ: 'u',
      ñÑ: 'n',
    };

    if (!input) {
      return null;
    }

    for (const key of Object.keys(trChars)) {
      input = input.replace(new RegExp('[' + key + ']', 'g'), trChars[key]);
    }

    return input
      .split('-')
      .map((word) => {
        const firstChar = word.charAt(0);
        return word.replace(firstChar, firstChar.toUpperCase());
      })
      .join('');

    // return input
    //     .toString()
    //     .toLowerCase()
    //     .replace(/[^\w-]+/g, ' ') // Add spaces to all non-word chars
    //     .trim()
    //     .replace(/^-+/, '') // Trim - from start of text
    //     .replace(/-+$/, '') // Trim - from end of text
    //     .replace(/-+/g, '') // Replace one or more -
    //     .replace(/\s+/g, '-');
  }
}
