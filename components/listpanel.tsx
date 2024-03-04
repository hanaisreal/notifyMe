"use client";
import React, { useState } from 'react';

export default function ListPanel() {
    return (
        <section className='w-5/6 h-[400px]'> {/* Use w-full to take full width */}
            <h2 className='ml-1 font-serif text-2xl font-semibold'>Records</h2>
            <div className='mt-4 rounded-xl bg-gray-700/50 p-4 h-[200px]'>
                {/* Content */}
            </div>
        </section>
    );
}
