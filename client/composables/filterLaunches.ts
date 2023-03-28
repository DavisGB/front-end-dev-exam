export const filterLaunches = () => {

    
    const filterLaunchByDate = (date : string, data : typeof ref) => {
        const newdata = data.filter((singleData: typeof ref) => {
            const launch_date_full = new Date(singleData.launch_date_local)
            const launch_year = launch_date_full.getFullYear()
            return launch_year == parseInt(date)
        })
        return newdata
    }

    return filterLaunchByDate
}