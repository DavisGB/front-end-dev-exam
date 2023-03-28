<template>
    <v-container>
        <h2>Front End Developer Exam</h2>
        <h3 class="my-5">
            Launch History
            <v-chip color="blue">SimpleTable</v-chip>
            <v-chip color="orange">Data from spaceX graphql</v-chip>
        </h3>
        <input 
            v-model="newyear"
            v-on:input="{yearfilter.changeYear(newyear);changeLaunchList()}"
            type="text"
            placeholder="Type Date to Filter" >
        <p>There are {{ uselaunch.launch?.length || 0 }} launches</p>
        <v-table>
            <thead>
                {{yearfilter.year === "" ?  "No year filter":"Filtering launches during " + yearfilter.year}}
                <v-btn @click="buttonsort()">
            {{usesort.sortstate > 0 ? "Sorted by ascending date" : "Sorted by descending date"}}
        </v-btn>
                <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Launch Date</th>
                    <th class="text-left">Launch Site</th>
                    <th class="text-left">Rocket Name</th>
                    <th class="text-left">Details</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="launch in uselaunch.launch" :key=" launch.mission_name">
                    <td>{{ launch.mission_name }}</td>
                    <td>{{ launch.launch_date_local }}</td>
                    <td>{{ launch.site_name }}</td>
                    <td>{{ launch.rocket.rocket_name }}</td>
                    <td>{{ launch.details }}</td>
                </tr>
            </tbody>
        </v-table>
    </v-container>
</template>
<script lang="ts" setup>
import { text } from 'stream/consumers';
const store = useCounter()
const yearfilter = useYearFilter()
const uselaunch = useLaunch()
const usesort= useSort()
const selection = ref(0)
const query = gql`
    query getLaunches {
        launches {
            mission_name
            launch_date_local
            launch_site {
                site_name
            }
            rocket {
                rocket_name
            }
            details
        }
    }
`

const { data } = useAsyncQuery<{
    launches: {
        mission_name: String
        launch_date_local: Date
        launch_site: { site_name: String }
        rocket: { rocket_name: String }
        details: String
    }
}>(query)
const launchesunfiltered = computed(() => data.value?.launches ?? [])
uselaunch.setLaunches(launchesunfiltered)
const filterLaunchByDate = filterLaunches()
const sortLaunchByDate = sortLaunches()
const changeLaunchList = () => {
    const newlaunchlist_unsorted = yearfilter.year == "" ?  launchesunfiltered:computed(() => filterLaunchByDate(yearfilter.year,launchesunfiltered.value) ?? [])
    
    const newlaunchlist = computed(() => sortLaunchByDate(newlaunchlist_unsorted.value) ?? [])
    console.log(newlaunchlist.value[0].mission_name)
    uselaunch.filterLaunches(newlaunchlist)
}
const buttonsort = () => {
    usesort.changeSortState()
    changeLaunchList()
}
//console.log(new Date(launches?.value[0]?.launch_date_local).getFullYear())
</script>

