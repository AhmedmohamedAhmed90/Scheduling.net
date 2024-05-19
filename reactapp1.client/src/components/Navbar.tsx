import { Box, Heading, Link, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

function NavBar() {
  return (
    <Box bg="blue.500" p={4} color="white">
      <Flex alignItems="center" padding={'1px'}>
        <Heading as="h1" size="md">
          University 
        </Heading>
        <Spacer />
        <Stack direction="row" spacing={4}>
          <NavLink to="/table">Table</NavLink>
          <NavLink to="/product">Product</NavLink>
          <NavLink to="/sendexception">Form</NavLink>
          <NavLink to="/adminexceptionspanel">Admin Exception Panel</NavLink>
        </Stack>
      </Flex>
    </Box>
  );
}

function NavLink({ to, children }: NavLinkProps) {
  return (
    <Link as={RouterLink} to={to} px={2} py={1} rounded="md" _hover={{ textDecoration: "none", bg: "blue.600" }}>
      <Text fontSize="md">{children}</Text>
    </Link>
  );
}

export default NavBar;
