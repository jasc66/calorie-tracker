import React, { useState } from 'react';
import { useMemo, Dispatch } from 'react';
import { Activity } from '../types';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { ActivityActions } from '../reducers/activity-reducer';

type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

const ActivityList: React.FC<ActivityListProps> = ({ activities, dispatch }) => {
  const [selectedOption, setSelectedOption] = useState<'comidas' | 'actividades'>('comidas');

  const filteredActivities = useMemo(() => {
    if (selectedOption === 'comidas') {
      return activities.filter((activity) => activity.category === 1);
    } else {
      return activities.filter((activity) => activity.category !== 1);
    }
  }, [selectedOption, activities]);

  const isEmptyActivities = useMemo(() => filteredActivities.length === 0, [filteredActivities]);

  return (
    <>
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-black">Comidas y Actividades</h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">LLeva un control de tus calorias.</p>
        <div className="flex mx-auto border-2 border-blue-500 rounded overflow-hidden mt-6">
          <button
            className={`py-1 px-4 ${selectedOption === 'comidas' ? 'bg-lime-500 text-black' : 'text-gray-700'} focus:outline-none`}
            onClick={() => setSelectedOption('comidas')}
          >
            Comidas
          </button>
          <button
            className={`py-1 px-4 ${selectedOption === 'actividades' ? 'bg-blue-500 text-black' : 'text-gray-700'} focus:outline-none`}
            onClick={() => setSelectedOption('actividades')}
          >
            Actividades
          </button>
        </div>
      </div>

      {isEmptyActivities ? (
        <p className="text-center my-5">No hay {selectedOption === 'actividades' ? 'actividades' : 'comidas'} aún...</p>
      ) : (
        filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="px-5 py-10 bg-white mt-5 flex justify-between shadow border-blue-600"
          >
            <div className="space-y-2 relative">
            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold border-blue-800 ${
  activity.category === 1 ? 'bg-lime-500' : 'bg-blue-500'
}`}>
  {selectedOption === 'comidas' ? 'Comida' : 'Actividad'}
</p>
              <p className="text-2xl font-bold pt-5">{activity.name}</p>
              <p className="font-black text-4xl text-blue-500">
                {activity.calories} <span>Calorias</span>
              </p>
              <p className="text-2xl font-bold pt-2 text-center text-stone-900">
                Detalles: <span className="text-lime-600">{activity.details}</span>
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <button
                onClick={() => dispatch({ type: 'set-activeId', payload: { id: activity.id } })}
              >
                <PencilSquareIcon className="h-8 w-8 text-gray-800" />
              </button>
              <button
                onClick={() => dispatch({ type: 'delete-activity', payload: { id: activity.id } })}
              >
                <XCircleIcon className="h-8 w-8 text-red-500" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ActivityList;
