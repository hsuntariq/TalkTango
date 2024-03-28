import Header from './Header'

import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import { Col, Row } from 'react-bootstrap'

const Home = () => {



    return (
        <>
            <Header />
            <Row>
                <Col xl={3}>
                    <Sidebar />
                </Col>
                <Col xl={6}>
                    <Timeline />
                </Col>
            </Row>
        </>

    )
}

export default Home