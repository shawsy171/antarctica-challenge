import type { NextPage } from 'next'
import Head from 'next/head'

import { getTFLServices } from './../services/api'

import ServiceMenu from '@/components/menu/menu';
import Alert from '@mui/material/Alert';

import { orderByModeName } from 'lib/orderByModeName';
import { sortByName } from 'lib/sortByName';
import { arrayFromServicesMap } from 'lib/arrayFromServicesMap';

import styles from '../styles/Home.module.css'

export interface LineStatus {
  statusSeverity: number
  reason?: string
}

interface ServiceType {
  name: string // should have a stricter type
}
export interface Service {
  id: number
  name: string // should have a stricter type
  modeName: string // should have a stricter type
  lineStatuses: LineStatus[]
  serviceTypes: ServiceType[]
}
interface HomeProps {
  services: Service[]
  error: boolean
}



const Home: NextPage<HomeProps> = ({ services, error }: HomeProps) => {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Antarctica London Transport</title>
        <meta name="description" content="Query transport for london api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Antarctica London Transport
        </h1>
        {error && <Alert role="alert" severity="error">No services available!</Alert>}
        <ServiceMenu services={services} />
      </main>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const servicesData = await getTFLServices();
  const error = servicesData.length === 0;
  
  let servicesByMode = orderByModeName(servicesData);

  servicesByMode = sortByName(servicesByMode);

  let formattedServices: any = arrayFromServicesMap(servicesByMode);
  
  return {
    props: { services: formattedServices, error }, // will be passed to the page component as props
  }
}

export default Home


