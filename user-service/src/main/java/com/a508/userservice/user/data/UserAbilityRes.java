package com.a508.userservice.user.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserAbilityRes {

	private Integer userId;

	private Integer fact;

	private Integer inference;

	private Integer voca;

	private Integer recognition;

	private Integer speed;

}
