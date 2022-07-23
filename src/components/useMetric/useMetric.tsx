import React, { useState, useEffect } from "react";

import {
  CloudWatchClient,
  PutMetricDataCommand,
  
} from "@aws-sdk/client-cloudwatch";

interface UseMetricConfig {
    namesapce: string,
    region: string,
    credentials: Credentials
}

interface Credentials {
    accessKeyId: string,
    secretAccessKey: string,
    sessionToken: string | undefined
}

interface DataPoints {
    metricName: string,
    value: number
}



function useMetric(config:UseMetricConfig) {
    const [cwClient, _ ] = useState(new CloudWatchClient(config));

    const  sendMetric = async (points:[DataPoints]) =>{
        
        const command = new PutMetricDataCommand({
        Namespace: config.namesapce,
        MetricData: points.map( item => {
            return {
                MetricName: item.metricName,
                StorageResolution: 1,
                Unit: "Seconds",
                Value: item.value,
            }
        })
    });
        return await cwClient.send(command)

    }

  return {
    sendMetric
  };
}

export default useMetric;