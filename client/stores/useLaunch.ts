export const useLaunch = defineStore('launch', {
    state: () => ({ launch: ref([]) }),
    actions: {
        setLaunches(launchlist: typeof ref) {
            this.launch = launchlist
        },
        filterLaunches(launchlist: typeof ref){
            this.launch = launchlist
        }
    },
})
