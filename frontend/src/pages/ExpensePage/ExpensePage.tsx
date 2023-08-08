import { mediaQueryMobileState } from '@store/mediaQuery';
import { Divider, Flex } from 'hang-log-design-system';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { useExpenseQuery } from '@hooks/api/useExpenseQuery';

import { containerStyling, dividerStyling } from '@pages/ExpensePage/ExpensePage.style';

import ExpenseListSection from '@components/expense/ExpenseListSection/ExpenseListSection';
import TotalExpenseSection from '@components/expense/TotalExpenseSection/TotalExpenseSection';

const ExpensePage = () => {
  const { tripId } = useParams();

  if (!tripId) throw new Error('존재하지 않는 tripId 입니다.');

  const isMobile = useRecoilValue(mediaQueryMobileState);

  const { expenseData } = useExpenseQuery(Number(tripId));

  return (
    <Flex css={containerStyling}>
      <TotalExpenseSection tripId={expenseData.id} />
      {isMobile && <Divider css={dividerStyling} />}
      <ExpenseListSection tripId={expenseData.id} />
    </Flex>
  );
};

export default ExpensePage;
