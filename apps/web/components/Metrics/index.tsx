import CpuChart from './CpuChart'
import MemChart from './MemChart'

export default function Metrics() {
    return (
        <div className='grid gap-2 grid-cols-1 lg:grid-cols-2'>
            <CpuChart />
            <MemChart />
        </div>
    )
}
