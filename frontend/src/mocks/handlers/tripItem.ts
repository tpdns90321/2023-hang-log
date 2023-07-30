import { trip } from '@mocks/data/trip';
import type { CurrencyType, TripItemFormData } from '@type/tripItem';
import { rest } from 'msw';

export const tripItemHandlers = [
  rest.post('/trips/:tripId/items', async (req, res, ctx) => {
    const { tripId } = req.params;
    const response = await req.json<TripItemFormData>();

    const newTripItem = {
      id: Number(new Date()),
      itemType: response.itemType,
      title: response.title,
      ordinal: 1,
      rating: response.rating,
      memo: response.memo,
      place: response.place
        ? {
            ...response.place,
            id: Number(new Date()),
            category: {
              id: 3,
              name: '명소',
            },
          }
        : null,
      expense: response.expense
        ? {
            id: Number(new Date()),
            currency: response.expense.currency as CurrencyType,
            amount: response.expense.amount,
            category: {
              id: 500,
              name: '교통',
            },
          }
        : null,
      imageUrls: [],
    };

    trip.dayLogs[0].items.push(newTripItem);

    return res(ctx.status(200));
  }),

  rest.delete('/trips/:tripId/items/:itemId', async (req, res, ctx) => {
    const { tripId, itemId } = req.params;

    const dayLogIndex = trip.dayLogs.findIndex((dayLog) => {
      return dayLog.items.findIndex((item) => item.id === Number(itemId)) !== -1;
    })!;

    const itemIndex = trip.dayLogs[dayLogIndex].items.findIndex(
      (item) => item.id === Number(itemId)
    )!;

    trip.dayLogs[dayLogIndex].items.splice(itemIndex, 1);

    return res(ctx.status(204));
  }),

  rest.put('/trips/:tripId/items/:itemId', async (req, res, ctx) => {
    const { tripId, itemId } = req.params;
    const response = await req.json<TripItemFormData>();

    const dayLogIndex = trip.dayLogs.findIndex((dayLog) => {
      return dayLog.items.findIndex((item) => item.id === Number(itemId)) !== -1;
    });

    const itemIndex = trip.dayLogs[dayLogIndex].items.findIndex(
      (item) => item.id === Number(itemId)
    );

    trip.dayLogs[dayLogIndex].items[itemIndex] = {
      id: Number(itemId),
      itemType: response.itemType,
      title: response.title,
      ordinal: trip.dayLogs[dayLogIndex].items[itemIndex].ordinal,
      rating: response.rating,
      memo: response.memo,
      place: response.place
        ? {
            ...response.place,
            id: trip.dayLogs[dayLogIndex].items[itemIndex].place?.id ?? Number(new Date()),
            category: {
              id: 3,
              name: '명소',
            },
          }
        : response.itemType
        ? trip.dayLogs[dayLogIndex].items[itemIndex].place
        : response.place,
      expense: response.expense
        ? {
            id: Number(new Date()),
            currency: response.expense.currency as CurrencyType,
            amount: response.expense.amount,
            category: {
              id: 500,
              name: '교통',
            },
          }
        : null,
      imageUrls: response.imageUrls,
    };

    return res(ctx.status(204));
  }),
];
