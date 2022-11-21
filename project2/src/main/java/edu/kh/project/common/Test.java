package edu.kh.project.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Test {
	public static void main(String[] args) throws ParseException {
		// Date : 날짜용 객체
		// Calendar : Date 업그레이드 객체 
		// SimpleDateFormat : 날짜를 원하는 형태의 문자열로 변환
		
		// 오늘 23시 59분 59초까지 남은 시간 초단위로 구하기
		Date a = new Date();
		Date b = new Date(1669087671993L);
		
		// 기준시간 : 1970년 1월 1일 09시 0분 0초
		// new Date(ms) : 기준시간 +ms만큼 지난 시간
		
		Calendar cal = Calendar.getInstance();
		//cal.add(단위, 추가할 값);
		cal.add(cal.DATE, 1); //날짜에 1추가
		
		//SimpleDateFormat를 이용해 cal날짜 중 시, 분, 초를 0:0:0으로 바꿈
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date temp = new Date(cal.getTimeInMillis());
		//하루 증가한 내일 날짜의 ms값을 이용해 Date객체 생성
		
		//System.out.println(sdf.format(temp));
		Date c = sdf.parse(sdf.format(temp));
		
		
		
		
		System.out.println(a);
		System.out.println(temp);
		System.out.println(c);
		
		//내일 자정 ms - 현재시간 ms
		long diff= c.getTime()-a.getTime();
		System.out.println(diff/1000 -1); // 23:59:59까지 남은 시간(s)
				
	}
}
