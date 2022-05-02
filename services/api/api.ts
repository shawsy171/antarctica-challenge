import axios from "axios";
import { servicesUrl, bikePointUrl } from "./config";


export const getTFLServices = async () => {
  try {
    const response = await axios.get(servicesUrl);

    return response.data;
  } catch (error) {
    console.error(error);
    return []
  }
}

export let createCycleHireFetch = () => {
  let previousController: any = null;

  return async (search: string) => {

    if(previousController != null) {
      previousController.abort();
    }

    const controller = new AbortController();
    previousController = controller;

    try {
      const response = await axios.get(`${bikePointUrl}${search}`, {
        signal: controller.signal
      });

      previousController = null;
      return response.data;

    } catch (error) {
      console.error(error);
      return []
    }
  }
}


