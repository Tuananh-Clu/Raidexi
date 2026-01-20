

export const LoadingScreen = ({isLoading}:{isLoading: boolean}) => {
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-100">
          <div className="w-16 h-16 ease-linear border-8 border-t-8 border-gray-200 rounded-full loader"></div>
        </div>
      )}
    </>
  )
}
