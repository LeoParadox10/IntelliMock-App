import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({ interview }) {

    const router = useRouter();

    const onFeedback = () => {
        router.push('/dashboard/interview/' + interview?.mockId + '/feedback')
    }

    const onStart = () => {
        router.push('/dashboard/interview/' + interview?.mockId)
    }

    return (
        <div className='border shadow-sm rounded-lg p-3'>
            <h2 className='font-bold'>{interview?.jobPosition}</h2>
            <h2 className='text-sm text-gray-600'>Years of Experience: <strong>{interview?.jobExperience}</strong></h2>
            <h2 className='text-xs text-gray-400'>Created At: {interview.createdAt}</h2>
            <div className='flex justify-between mt-2 gap-5'>
                <Button size='sm' className='w-full' variant='outline' onClick={onFeedback}>Feedback</Button>
                <Button size='sm' className='w-full' onClick={onStart}>Start</Button>
            </div>
        </div>
    )
}

export default InterviewItemCard