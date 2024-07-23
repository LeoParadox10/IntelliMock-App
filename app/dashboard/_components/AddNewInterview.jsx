'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModel'
import { LoaderIcon, LoaderPinwheel } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState();
    const [jobDescription, setJobDescription] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        console.log(jobPosition, jobDescription, jobExperience)

        const InputPrompt = "Job Position: " + jobPosition + ", Job Description: " + jobDescription +
            ", Years of Experience: " + jobExperience +
            ", Depending on the Job Position, Job Description and Years of Experience give us " +
            process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
            " interview questions along with answer in JSON format. Give us Question and Answer field as JSON"

        const result = await chatSession.sendMessage(InputPrompt)
        const MockJSONresponse = (result.response.text()).replace('```json', '').replace('```', '')
        console.log(JSON.parse(MockJSONresponse));
        setJsonResponse(MockJSONresponse);

        if (MockJSONresponse) {
            const resp = await db.insert(MockInterview).values({
                mockId: uuidv4(),
                jsonMockResp: MockJSONresponse,
                jobPosition: jobPosition,
                jobDesc: jobDescription,
                jobExperience: jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY')
            }).returning({ mockId: MockInterview.mockId })

            console.log("Inserted Id:", resp)
            if (resp) {
                setOpenDialog(false)
                router.push('/dashboard/interview/' + resp[0]?.mockId)
            }
        }
        else
            console.log("ERROR")
        setLoading(false)
    }

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary 
                hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}>
                <h2 className='font-bold text-lg text-center'>
                    + Add New
                </h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about the job you are interviewing...</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add details about your job position/role, job description and years of experience.</h2>
                                    <div className='mt-7 my-3'>
                                        <label>Job Role / Position</label>
                                        <Input placeholder="Ex. Machine Learning Engineer"
                                            required onChange={(event) => setJobPosition(event.target.value)} />
                                    </div>
                                    <div className='my-3'>
                                        <label>Job Description / Tech Stack</label>
                                        <Textarea placeholder="Ex. Natural Language Processing, ANN's, etc."
                                            required onChange={(event) => setJobDescription(event.target.value)} />
                                    </div>
                                    <div className='my-3'>
                                        <label>Years of Experience</label>
                                        <Input placeholder="Ex. 5" type='number' max='50'
                                            required onChange={(event) => setJobExperience(event.target.value)} />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type='button' variant='ghost' onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type='submit' disabled={loading}>
                                        {loading ?
                                            <><LoaderIcon className='animate-spin' />Generating from AI</> : 'Start Interview'}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview