import React, { Fragment } from 'react';
import { Tab } from '@headlessui/react';

export const Panel: React.FC = () => {

    return (
        <div className="rounded-lg bg-orange-500 w-96 h-96">
            <Tab.Group>
                <div className="flex justify-evenly">
                    <Tab.List>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={
                                        selected ? "bg-blue-500 text-white" : "flex bg-white text-black"
                                    }
                                >
                                    Tab 0
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={
                                        selected ? "bg-blue-500 text-white" : "flex bg-white text-black"
                                    }
                                >
                                    Tab 1
                                </button>
                            )}
                        </Tab>
                        <Tab>Tab 2</Tab>
                        <Tab>Tab 3</Tab>
                    </Tab.List>
                </div>
                <Tab.Panels>
                    <Tab.Panel>Content 1</Tab.Panel>
                    <Tab.Panel>Content 2</Tab.Panel>
                    <Tab.Panel>Content 3</Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}