import { useAuth } from '@/core/auth/AuthProvider';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from "react-native-paper";
import React from 'react';

import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

export default function Home() {

  const { signOut, state } = useAuth();

  const FakeUser = {
    username: "VShah",
    active: true,
    roleId: 20,
    dateCreated: "2018-03-02T00:00:00.000Z",
    dateModified: "2018-03-02T00:00:00.000z",
    lastName: "Shah",
    firstName: "Viraj",
    displayName: "Viraj Shah",
    jiraUsername: "viraj.shah",
    intacctUserId: "EE-00112",
    userId: 41,
    emailAddress: "vshah@experient.com",
    openAtCurWeeksTimesheet: true,
    activeInterviewer: true,
    createIntacctTimesheet: true,
    roleName: "Developer",
  };

  return (
    <View>
      <Text style={styles.txt}>THIS IS THE HOME PAGE</Text>
      <Button style={{ width: 150 }} mode="contained" onPress={signOut}>Log out!</Button>
      {/* <JsonView data={FakeUser} shouldExpandNode={allExpanded} style={defaultStyles} /> */}
    </View >


  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  txt: {
    color: "green",
    fontWeight: "bold",
    fontSize: 28,
    paddingTop: 30,
    paddingLeft: 5,
    paddingBottom: 20
  }
});
