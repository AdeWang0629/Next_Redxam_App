import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import api from '@utils/api';
// import { Line } from "@reactchartjs/react-chart.js";

const Overview: NextPage = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    invitedUsers: 0,
    acceptedUsers: 0,
    usersWithBalance: 0
  });

  useEffect(() => {
    (async () => {
      try {
        const { data: overviewData } = await api.getOverview(
          getCookie('admin_token') as string
        );
        console.log(overviewData);
        setData(overviewData.data.overview);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex flex-col mt-4">
        <div className="flex flex-wrap justify-around items-center">
          {[
            { title: 'Total Users', value: data?.totalUsers || 0 },
            { title: 'Invited Users', value: data?.invitedUsers || 0 },
            { title: 'Accepted Users', value: data?.acceptedUsers || 0 },
            { title: 'Users with balance', value: data?.usersWithBalance || 0 }
          ].map((item) => {
            const id = item.title.split(' ').join('_').toLowerCase();

            return (
              <div
                key={id}
                className="flex flex-col items-center px-16 py-6 border rounded-xl border-black dark:border-white border-opacity-30 mt-2"
              >
                <span className="opacity-70 dark:text-white">{item.title}</span>
                <span className="text-5xl mt-4 dark:text-white">
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex border rounded-xl border-black dark:border-white border-opacity-30 mx-32 mt-8">
          <div className="flex flex-col p-4 flex-1">
            <div className="m-4">
              <h2 className="text-2xl dark:text-white">Chart of users added</h2>
              <span className="text-sm opacity-70 dark:text-white">
                as of 25 May 2019, 09:41 PM
              </span>
            </div>
            {/* <Line
              data={{
                labels: ["1", "2", "3", "4", "5", "6"],
                datasets: [
                  {
                    label: "Users (today)",
                    data: [12, 19, 3, 5, 2, 3],
                    fill: false,
                    backgroundColor: "rgba(55, 81, 255, 1)",
                    borderColor: "rgba(55, 81, 255, 0.2)",
                  },
                  {
                    label: "Users (yesterday)",
                    data: [10, 21, 5, 5, 4, 6],
                    fill: false,
                    backgroundColor: "rgba(223, 224, 235, 1)",
                    borderColor: "rgba(223, 224, 235, 0.2)",
                  },
                ],
              }}
              options={{
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            /> */}
          </div>
          <div className="flex flex-col justify-center border-l border-black dark:border-white border-opacity-30">
            {[
              { title: 'Resolved', value: 449 },
              { title: 'Received', value: 426 },
              { title: 'Average first response time', value: '33m' },
              { title: 'Average response time', value: '3h 8m' },
              { title: 'Resolution within SLA', value: '64%' }
            ].map((item, idx) => {
              const id = item.title.split(' ').join('_').toLowerCase();

              return (
                <div
                  className={
                    `flex flex-col items-center px-6 py-4 w-48 text-center${
                      idx !== 4
                        ? ' border-b border-black dark:border-white border-opacity-30'
                        : ''}`
                  }
                  key={id}
                >
                  <span className="opacity-70 dark:text-white">
                    {item.title}
                  </span>
                  <span className="text-3xl mt-2 dark:text-white">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex mx-32 mt-8">
        <div className="flex-1 flex flex-col border rounded-xl border-black dark:border-white border-opacity-30 py-6">
          <div className="flex items-center px-8 mb-4">
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl dark:text-white">Unresolved Issues</h2>
              <span className="opacity-70 text-sm dark:text-white">
                Group:
                {' '}
                <span className="font-bold">Support</span>
              </span>
            </div>
            <div className="flex-1 flex justify-end">
              <Link href="/">
                <a className="text-blue-600 dark:text-blue-400">View details</a>
              </Link>
            </div>
          </div>

          {[
            { title: 'Waiting on Feature Request', value: 4238 },
            { title: 'Awaiting Customer Response', value: 1005 },
            { title: 'Awaiting Developer Fix', value: 914 },
            { title: 'Pending', value: 281 }
          ].map((item, idx) => {
            const id = item.title.split(' ').join('_').toLowerCase();

            return (
              <div
                key={id}
                className={
                  `flex items-center px-10${
                    idx !== 3
                      ? ' border-b border-black dark:border-white border-opacity-30 py-6'
                      : ' pt-6'}`
                }
              >
                <span className="flex-1 dark:text-white">{item.title}</span>
                <span className="opacity-70 dark:text-white">{item.value}</span>
              </div>
            );
          })}
        </div>

        <div className="flex-1 mr-2" />
      </div>
    </>
  );
};

export default Overview;
