
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const DashboardScreen = () => {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const horizontalScrollRef = useRef(null);
  const verticalScrollRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const headers = [
    { key: "employee", label: "Employee", icon: "👤" },
    { key: "age", label: "Age", icon: "🎂" },
    { key: "department", label: "Department", icon: "🏢" },
    { key: "location", label: "Location", icon: "📍" },
    { key: "position", label: "Position", icon: "💼" },
    { key: "salary", label: "Salary", icon: "💰" },
    { key: "experience", label: "Experience", icon: "⏱️" },
    { key: "status", label: "Status", icon: "🔄" },
    { key: "rating", label: "Rating", icon: "⭐" },
  ];

  const data = [
    { employee: "John Doe", age: "25", department: "Engineering", location: "New York", position: "Senior Dev", salary: "$95,000", experience: "3 years", status: "Active", rating: 5, avatar: "🧑‍💻" },
    { employee: "Jane Smith", age: "30", department: "Design", location: "London", position: "Lead Designer", salary: "$85,000", experience: "5 years", status: "Active", rating: 4, avatar: "👩‍🎨" },
    { employee: "Mike Johnson", age: "28", department: "Product", location: "Toronto", position: "PM", salary: "$105,000", experience: "4 years", status: "Active", rating: 5, avatar: "👨‍💼" },
    { employee: "Sarah Wilson", age: "32", department: "Finance", location: "Sydney", position: "Senior Analyst", salary: "$78,000", experience: "6 years", status: "Active", rating: 4, avatar: "👩‍💼" },
    { employee: "David Brown", age: "27", department: "Engineering", location: "Berlin", position: "Full Stack", salary: "$88,000", experience: "3 years", status: "On Leave", rating: 4, avatar: "🧑‍💻" },
    { employee: "Emma Davis", age: "29", department: "Marketing", location: "Paris", position: "Brand Manager", salary: "$72,000", experience: "4 years", status: "Active", rating: 3, avatar: "👩‍🎨" },
    { employee: "Alex Chen", age: "26", department: "Engineering", location: "Tokyo", position: "Frontend Dev", salary: "$82,000", experience: "2 years", status: "Active", rating: 4, avatar: "🧑‍💻" },
    { employee: "Lisa Garcia", age: "31", department: "HR", location: "Madrid", position: "HR Manager", salary: "$75,000", experience: "5 years", status: "Active", rating: 5, avatar: "👩‍💼" },
    { employee: "Tom Anderson", age: "33", department: "Operations", location: "Stockholm", position: "Director", salary: "$120,000", experience: "8 years", status: "Active", rating: 5, avatar: "👨‍💼" },
    { employee: "Maria Rodriguez", age: "28", department: "Design", location: "Barcelona", position: "UI Designer", salary: "$68,000", experience: "4 years", status: "Active", rating: 4, avatar: "👩‍🎨" },
    { employee: "James Miller", age: "35", department: "Engineering", location: "Amsterdam", position: "Tech Lead", salary: "$110,000", experience: "7 years", status: "Active", rating: 5, avatar: "🧑‍💻" },
    { employee: "Sophie Turner", age: "24", department: "Marketing", location: "Vienna", position: "Digital Marketing", salary: "$45,000", experience: "1 year", status: "Probation", rating: 3, avatar: "👩‍💼" },
  ];

  const FIRST_COLUMN_WIDTH = 150;
  const COLUMN_WIDTH = 120;
  // const ROW_HEIGHT = 60;

  const departments = ["All", "Engineering", "Design", "Product", "Finance", "Marketing", "HR", "Operations"];

  const filteredData = data.filter(row => {
    const matchesSearch = row.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         row.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         row.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "All" || row.department === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return { backgroundColor: "#D1FAE5", color: "#065F46", borderColor: "#A7F3D0" };
      case "On Leave":
        return { backgroundColor: "#FEF3C7", color: "#92400E", borderColor: "#FCD34D" };
      case "Probation":
        return { backgroundColor: "#FED7AA", color: "#C2410C", borderColor: "#FDBA74" };
      default:
        return { backgroundColor: "#F3F4F6", color: "#374151", borderColor: "#D1D5DB" };
    }
  };

  const getDepartmentStyle = (dept) => {
    const colors = {
      Engineering: { backgroundColor: "#DBEAFE", color: "#1E40AF" },
      Design: { backgroundColor: "#E9D5FF", color: "#7C3AED" },
      Product: { backgroundColor: "#D1FAE5", color: "#059669" },
      Finance: { backgroundColor: "#FEF3C7", color: "#D97706" },
      Marketing: { backgroundColor: "#FCE7F3", color: "#BE185D" },
      HR: { backgroundColor: "#E0E7FF", color: "#3730A3" },
      Operations: { backgroundColor: "#FED7AA", color: "#EA580C" },
    };
    return colors[dept] || { backgroundColor: "#F9FAFB", color: "#6B7280" };
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Text key={i} style={styles.star}>
        {i < rating ? "⭐" : "☆"}
      </Text>
    ));
  };

  const handleFilterPress = (filter) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setSelectedFilter(filter);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Employee Dashboard</Text>
        <Text style={styles.subtitle}>Manage your team with style 🚀</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search employees, departments..."
            placeholderTextColor="#9CA3AF"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {/* Filter Buttons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {departments.map((dept) => (
            <TouchableOpacity
              key={dept}
              onPress={() => handleFilterPress(dept)}
              style={[
                styles.filterButton,
                selectedFilter === dept ? styles.activeFilterButton : styles.inactiveFilterButton
              ]}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === dept ? styles.activeFilterText : styles.inactiveFilterText
              ]}>
                {dept}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Table Container */}
      <View style={styles.tableContainer}>
        {/* Sticky Header */}
        <View style={styles.tableHeader}>
          <View style={[styles.headerCell, styles.fixedHeaderCell, { width: FIRST_COLUMN_WIDTH }]}>
            <Text style={styles.headerIcon}>{headers[0].icon}</Text>
            <Text style={styles.headerText}>{headers[0].label}</Text>
          </View>
          
          <ScrollView
            ref={horizontalScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentOffset={{ x: scrollX, y: 0 }}
            onScroll={(e) => setScrollX(e.nativeEvent.contentOffset.x)}
            scrollEventThrottle={16}
          >
            {headers.slice(1).map((header, index) => (
              <View key={index} style={[styles.headerCell, { width: COLUMN_WIDTH }]}>
                <Text style={styles.headerIcon}>{header.icon}</Text>
                <Text style={styles.headerText}>{header.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Table Body */}
        <ScrollView
          ref={verticalScrollRef}
          style={styles.tableBody}
          contentOffset={{ x: 0, y: scrollY }}
          onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
          scrollEventThrottle={16}
        >
          {filteredData.map((row, rowIndex) => (
            <View key={rowIndex} style={[
              styles.tableRow,
              rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow
            ]}>
              {/* Fixed first column */}
              <View style={[styles.fixedCell, { width: FIRST_COLUMN_WIDTH }]}>
                <View style={styles.employeeInfo}>
                  <Text style={styles.avatar}>{row.avatar}</Text>
                  <View style={styles.employeeDetails}>
                    <Text style={styles.employeeName}>{row.employee}</Text>
                    <Text style={styles.employeeLocation}>📍 {row.location}</Text>
                  </View>
                </View>
              </View>

              {/* Scrollable columns */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentOffset={{ x: scrollX, y: 0 }}
                onScroll={(e) => setScrollX(e.nativeEvent.contentOffset.x)}
                scrollEventThrottle={16}
              >
                {/* Age */}
                <View style={[styles.cell, { width: COLUMN_WIDTH }]}>
                  <View style={styles.ageBadge}>
                    <Text style={styles.ageText}>{row.age}</Text>
                  </View>
                </View>

                {/* Department */}
                <View style={[styles.cell, { width: COLUMN_WIDTH }]}>
                  <View style={[styles.departmentBadge, getDepartmentStyle(row.department)]}>
                    <Text style={[styles.departmentText, { color: getDepartmentStyle(row.department).color }]}>
                      {row.department}
                    </Text>
                  </View>
                </View>

                {/* Location */}
                <View style={[styles.cell, { width: COLUMN_WIDTH }]}>
                  <Text style={styles.locationText}>📍 {row.location}</Text>
                </View>

                {/* Position */}
                <View style={[styles.cell, { width: COLUMN_WIDTH }]}>
                  <Text style={styles.positionText}>💼 {row.position}</Text>
                </View>

                {/* Salary */}
                <View style={[styles.cell, { width: COLUMN_WIDTH }]}>
                  <View style={styles.salaryBadge}>
                    <Text style={styles.salaryText}>{row.salary}</Text>
                  </View>
                </View>

                {/* Experience */}
                <View style={[styles.cell, { width: COLUMN_WIDTH }]}>
                  <View style={styles.experienceBadge}>
                    <Text style={styles.experienceText}>{row.experience}</Text>
                  </View>
                </View>

                {/* Status */}
                <View style={[styles.cell, { width: COLUMN_WIDTH }]}>
                  <View style={[styles.statusBadge, getStatusStyle(row.status)]}>
                    <Text style={[styles.statusText, { color: getStatusStyle(row.status).color }]}>
                      {row.status}
                    </Text>
                  </View>
                </View>

                {/* Rating */}
                <View style={[styles.cell, { width: COLUMN_WIDTH }]}>
                  <View style={styles.ratingContainer}>
                    {renderStars(row.rating)}
                  </View>
                </View>
              </ScrollView>
            </View>
          ))}
        </ScrollView>

        {/* Footer */}
        <View style={styles.tableFooter}>
          <Text style={styles.footerText}>
            Showing {filteredData.length} of {data.length} employees
          </Text>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "#10B981" }]} />
              <Text style={styles.legendText}>Active</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "#F59E0B" }]} />
              <Text style={styles.legendText}>On Leave</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "#F97316" }]} />
              <Text style={styles.legendText}>Probation</Text>
            </View>
          </View>
        </View>
        </View>
      {/* </div> */}

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar,
            { width: `${Math.min(100, (scrollX / (COLUMN_WIDTH * headers.length)) * 100)}%` }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 25,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
  },
  filterContainer: {
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
  },
  activeFilterButton: {
    backgroundColor: "#4F46E5",
    borderColor: "#4F46E5",
  },
  inactiveFilterButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  inactiveFilterText: {
    color: "#6B7280",
  },
  tableContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#4F46E5",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerCell: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRightWidth: 1,
    borderRightColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
  },
  fixedHeaderCell: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  headerIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  tableBody: {
    flex: 1,
    maxHeight: screenHeight * 0.5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    minHeight: 60,
  },
  evenRow: {
    backgroundColor: "#FAFBFC",
  },
  oddRow: {
    backgroundColor: "#FFFFFF",
  },
  fixedCell: {
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 2,
    borderRightColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  cell: {
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#F3F4F6",
    minHeight: 60,
    paddingHorizontal: 8,
  },
  employeeInfo: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  avatar: {
    fontSize: 24,
    marginRight: 12,
  },
  employeeDetails: {
    flex: 1,
  },
  employeeName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 2,
  },
  employeeLocation: {
    fontSize: 11,
    color: "#6B7280",
  },
  ageBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ageText: {
    color: "#1E40AF",
    fontSize: 13,
    fontWeight: "600",
  },
  departmentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  departmentText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  locationText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  positionText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    fontWeight: "500",
  },
  salaryBadge: {
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
  },
  salaryText: {
    color: "#065F46",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  experienceBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  experienceText: {
    color: "#4B5563",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  star: {
    fontSize: 14,
    marginHorizontal: 1,
  },
  tableFooter: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  footerText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#6B7280",
  },
  progressContainer: {
    position: "absolute",
    bottom: 20,
    left: "20%",
    right: "20%",
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#4F46E5",
    borderRadius: 2,
  },
});

export default DashboardScreen;