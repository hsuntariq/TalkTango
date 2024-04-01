import { Card, CardHeader } from '@mui/material'
import Skeleton from 'react-loading-skeleton'

const Loader = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <div className="d-flex gap-4 align-items-center">
                        <div className="img">
                            <Skeleton circle height={70} width={70} />
                        </div>
                        <div className="user-data">
                            <Skeleton width={100} />
                            <Skeleton width={50} />
                        </div>
                    </div>
                </CardHeader>
                <Card>
                    <Skeleton className='rounded-4' height={500} width={'100%'} />
                    <div className="flex p-0 m-0 mt-2">
                        <div className="w-2/5 p-0 m-0  border">
                            <Skeleton width={'100%'} />
                        </div>
                        <div className="w-2/5 p-0 m-0  border">
                            <Skeleton width={'100%'} />

                        </div>
                        <div className="w-2/5 p-0 m-0  border">
                            <Skeleton width={'100%'} />

                        </div>
                    </div>
                </Card>
            </Card>
        </>
    )
}

export default Loader