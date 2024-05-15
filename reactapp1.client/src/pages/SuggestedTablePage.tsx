import Table from "../components/Table";
import { useContext } from "react";
import { Store } from "../Store";
import { Button, HStack, Spacer, Stack, Text, VStack } from "@chakra-ui/react";

export default function SuggestedTablePage() {
  const store = useContext(Store);
  const {
    state: { suggestedCourses, tableIndex },
    dispatch,
  } = store;
  console.log(suggestedCourses[tableIndex]);
  return (
    <>
      <Stack>
        <HStack alignItems="center" mr={10} ml={10} mt={10}>
          <VStack>
            <Text style={{ fontSize: 24 }}>Schedule {tableIndex + 1}</Text>
            <Text
              style={{
                color:
                  suggestedCourses[tableIndex][0].conflict_count === 0
                    ? "green"
                    : "red",
              }}
            >
              {suggestedCourses[tableIndex][0].conflict_count === 0
                ? "No conflicts"
                : `Number of conflicts : ${suggestedCourses[tableIndex][0].conflict_count}`}
              {}
            </Text>
          </VStack>

          <Spacer />
          <Button
            isActive={tableIndex === 0}
            onClick={() => {
              dispatch({
                type: "DECREMENT_TABLEINDEX",
                payload: undefined,
              });
            }}
          >
            Previous
          </Button>
          <Button
            isActive={tableIndex === suggestedCourses.length - 1}
            onClick={() => {
              dispatch({
                type: "INCREMENT_TABLEINDEX",
                payload: undefined,
              });
            }}
          >
            Next
          </Button>
        </HStack>
        <Table courses={suggestedCourses[tableIndex]}></Table>
      </Stack>
    </>
  );
}
