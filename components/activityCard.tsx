import Link from 'next/link';
import {
  Box,
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tag,
  TagLabel,
  Text
} from '@chakra-ui/react';
import { Card } from './card';

interface IActivity {
  readonly distance?: number;
  readonly duration?: string;
  readonly id: string;
  readonly name?: string;
  readonly reps?: number;
  readonly timestamp: string;
  readonly type: string;
}

interface IActivityCardProps {
  readonly activity: IActivity;
}

const ActivityCard: React.FunctionComponent<IActivityCardProps> = ({
  activity
}) => {
  const { duration, id, name, type, distance, reps } = activity;
  const timestamp = new Date(activity.timestamp).toLocaleString();

  return (
    <Link href={`/activity/${id}`}>
      <Card variant="rounded">
        <Box>
          <Text fontWeight="bold">{name}</Text>
          <Tag size="sm" variant="outline" colorScheme="blue">
            <TagLabel>{type}</TagLabel>
          </Tag>
          <Text fontSize="sm">{timestamp}</Text>
        </Box>

        <Flex gap="4">
          <Box>
            <Stat>
              <StatLabel>Duration</StatLabel>
              <StatNumber>{duration}</StatNumber>
              <StatHelpText>min</StatHelpText>
            </Stat>
          </Box>

          {distance ? (
            <Box>
              <Stat>
                <StatLabel>Distance</StatLabel>
                <StatNumber>{distance}</StatNumber>
                <StatHelpText>km</StatHelpText>
              </Stat>
            </Box>
          ) : null}

          {reps ? (
            <Box>
              <Stat>
                <StatLabel>Reps</StatLabel>
                <StatNumber>{reps}</StatNumber>
              </Stat>
            </Box>
          ) : null}
        </Flex>
      </Card>
    </Link>
  );
};

export default ActivityCard;
