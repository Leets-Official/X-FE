import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';

export default function Home() {
  return (
    <main className="w-[600px] border-x border-gray-200 flex flex-col items-stretch dark:border-gray-700 md:w-[600px]">
      <TabProvider>
        <Tab />
      </TabProvider>
    </main>
  );
}
