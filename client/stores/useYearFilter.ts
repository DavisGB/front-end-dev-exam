export const useYearFilter = defineStore('yearfilter', {
    state: () => ({ year: "" }),
    actions: {
        changeYear(newyear: string) {
            this.year = newyear
        },
    },
})
