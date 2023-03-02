export const DrawPrompt = ({f_acceptDraw, f_denyDraw}: any) => {
    return (
        <>
            <div className="flex flex-col">
                <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
                <div>Accept Draw?</div>
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => f_acceptDraw()}>Yes</button>
                    <button onClick={() => f_denyDraw()}>No</button>
                </div>
            </div>
        </>
    )
}                               