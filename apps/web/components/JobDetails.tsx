"use client";

import { SheetContent, SheetDescription, SheetHeader, SheetTitle, } from './ui/sheet'

export default function JobDetails() {
    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Jobs Details</SheetTitle>
                <SheetDescription>
                    Find the details related to this transcoding Job.
                </SheetDescription>
            </SheetHeader>
            <div className="">
                {/* output-config */}
                <div className="">
                    <div className="">
                        Output format
                    </div>
                    <div className="">
                        "value of output-format"
                    </div>
                </div>
                <div className="">
                    <div className="">
                        output resolution
                    </div>
                    <div className="">
                        "value of resolution"
                    </div>
                </div>
                <div className="">
                    <div className="">
                        include audio
                    </div>
                    <div className="">
                        "value of include audio"
                    </div>
                </div>
            </div>
            <div className="">
                {/* error message if any */}
                <div className="">
                    Error message
                </div>
                <div className="">
                    "value of error-message"
                </div>
            </div>
            {/* output url if there */}
            <div className="">
                <div className="">
                    Output url download button
                </div>
            </div>
        </SheetContent>
    )
}
