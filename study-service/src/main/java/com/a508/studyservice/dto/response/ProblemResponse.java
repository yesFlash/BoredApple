package com.a508.studyservice.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProblemResponse {

	private String title;

	private String question;

	private String content;

	private String option1;

	private String option2;

	private String option3;

	private Integer userAnswer;

	private Integer answer;

	//어떤 유형 문제인지
	private String category;

	private String type;

	private Integer problemId;

	private boolean correct;

	private LocalDateTime createdAt;

}
