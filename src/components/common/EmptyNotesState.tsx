import { Empty, Typography } from 'antd'

const EmptyNotesState = ({
  description,
}: {
  description: string | React.ReactNode
}) => {
  return (
    <div className="col-span-full text-center">
      <div className="h-full w-full mt-10">
        <div className="flex flex-row justify-center items-center">
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 100 }}
            className="flex flex-col items-center"
            description={<Typography.Text>{description}</Typography.Text>}
          ></Empty>
        </div>
      </div>
    </div>
  )
}

export default EmptyNotesState
