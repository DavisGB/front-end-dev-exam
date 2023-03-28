export const useSort = defineStore('usesort', {
    state: () => ({ sortstate: 1 }),
    actions: {
        changeSortState() {
            this.sortstate = this.sortstate * -1
        },
    },
})
