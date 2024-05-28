UPDATE lectures
SET EndTime = CASE 
    WHEN EndTime = '10:00' THEN '9:30'
    WHEN EndTime = '12:00' THEN '11:00'
    WHEN EndTime = '2:00' THEN '12:30'
    WHEN EndTime = '4:00' THEN '2:00'
    WHEN EndTime = '6:00' THEN '3:30'
    WHEN EndTime = '8:00' THEN '5:00'
    ELSE EndTime
END;

UPDATE lectures
SET StartTime = CASE 
    WHEN StartTime = '10:00' THEN '9:30'
    WHEN StartTime = '12:00' THEN '11:00'
    WHEN StartTime = '2:00' THEN '12:30'
    WHEN StartTime = '4:00' THEN '2:00'
    WHEN StartTime = '6:00' THEN '3:30'
    ELSE StartTime
END;


