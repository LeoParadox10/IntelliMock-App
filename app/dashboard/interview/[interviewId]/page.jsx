'use client'

import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';

function Interview({ params }) {

    const [interviewData, setInterviewData] = useState();
    const [webcamEnable, setWebCamEnable] = useState(false)
    useEffect(() => {
        console.log(params.interviewId);
        getInterviewDetails();
    }, []);

    /**
     * Used to get interview details by MockId / InterviewId
     */

    const getInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId))

        setInterviewData(result[0]);
    }

    return (
        <div className='my-10'>
            <h2 className='font-bold text-2xl '>Let's Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='flex flex-col my-5 gap-5 '>
                    <div className='flex flex-col p-5 round-lg border gap-5'>
                        <h2 className='text-lg'><strong>Job Role / Position:</strong>{interviewData?.jobPosition}</h2>
                        <h2 className='text-lg'><strong>Job Description / Tech Stacks:</strong>{interviewData?.jobDesc}</h2>
                        <h2 className='text-lg'><strong>Years of Experience:</strong>{interviewData?.jobExperience}</h2>
                    </div>
                    <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                        <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb /><strong>Information</strong></h2>
                        <h2 className='mt-3'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                        <h2><strong>{process.env.NEXT_PUBLIC_NOTE}</strong></h2>
                    </div>
                </div>
                <div>
                    {webcamEnable ?
                        <Webcam onUserMedia={() => setWebCamEnable(true)} onUserMediaError={() => setWebCamEnable(false)} mirrored={true} style={{ height: 300, width: 300 }} />
                        :
                        <>
                            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
                            <Button className='w-full' onClick={() => setWebCamEnable(true)}>Enable Webcam and Microphone</Button>
                        </>
                    }
                </div>
            </div>
            <div className='pt-2 justify-center w-auto'>
                <Link href={'/dashboard/interview/' + params.interviewId + '/start'}>
                    <Button className='w-full'>Start Interview</Button>
                </Link>
            </div>
        </div>
    )
}
export default Interview