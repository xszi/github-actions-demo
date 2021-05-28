export * from './helper'
export function filterOptions(input: string, option: any): boolean {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
}