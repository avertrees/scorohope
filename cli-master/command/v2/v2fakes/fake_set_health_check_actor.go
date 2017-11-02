// This file was generated by counterfeiter
package v2fakes

import (
	"sync"

	"code.cloudfoundry.org/cli/actor/v2action"
	"code.cloudfoundry.org/cli/command/v2"
)

type FakeSetHealthCheckActor struct {
	SetApplicationHealthCheckTypeByNameAndSpaceStub        func(name string, spaceGUID string, healthCheckType string, httpEndpoint string) (v2action.Application, v2action.Warnings, error)
	setApplicationHealthCheckTypeByNameAndSpaceMutex       sync.RWMutex
	setApplicationHealthCheckTypeByNameAndSpaceArgsForCall []struct {
		name            string
		spaceGUID       string
		healthCheckType string
		httpEndpoint    string
	}
	setApplicationHealthCheckTypeByNameAndSpaceReturns struct {
		result1 v2action.Application
		result2 v2action.Warnings
		result3 error
	}
	setApplicationHealthCheckTypeByNameAndSpaceReturnsOnCall map[int]struct {
		result1 v2action.Application
		result2 v2action.Warnings
		result3 error
	}
	CloudControllerAPIVersionStub        func() string
	cloudControllerAPIVersionMutex       sync.RWMutex
	cloudControllerAPIVersionArgsForCall []struct{}
	cloudControllerAPIVersionReturns     struct {
		result1 string
	}
	cloudControllerAPIVersionReturnsOnCall map[int]struct {
		result1 string
	}
	invocations      map[string][][]interface{}
	invocationsMutex sync.RWMutex
}

func (fake *FakeSetHealthCheckActor) SetApplicationHealthCheckTypeByNameAndSpace(name string, spaceGUID string, healthCheckType string, httpEndpoint string) (v2action.Application, v2action.Warnings, error) {
	fake.setApplicationHealthCheckTypeByNameAndSpaceMutex.Lock()
	ret, specificReturn := fake.setApplicationHealthCheckTypeByNameAndSpaceReturnsOnCall[len(fake.setApplicationHealthCheckTypeByNameAndSpaceArgsForCall)]
	fake.setApplicationHealthCheckTypeByNameAndSpaceArgsForCall = append(fake.setApplicationHealthCheckTypeByNameAndSpaceArgsForCall, struct {
		name            string
		spaceGUID       string
		healthCheckType string
		httpEndpoint    string
	}{name, spaceGUID, healthCheckType, httpEndpoint})
	fake.recordInvocation("SetApplicationHealthCheckTypeByNameAndSpace", []interface{}{name, spaceGUID, healthCheckType, httpEndpoint})
	fake.setApplicationHealthCheckTypeByNameAndSpaceMutex.Unlock()
	if fake.SetApplicationHealthCheckTypeByNameAndSpaceStub != nil {
		return fake.SetApplicationHealthCheckTypeByNameAndSpaceStub(name, spaceGUID, healthCheckType, httpEndpoint)
	}
	if specificReturn {
		return ret.result1, ret.result2, ret.result3
	}
	return fake.setApplicationHealthCheckTypeByNameAndSpaceReturns.result1, fake.setApplicationHealthCheckTypeByNameAndSpaceReturns.result2, fake.setApplicationHealthCheckTypeByNameAndSpaceReturns.result3
}

func (fake *FakeSetHealthCheckActor) SetApplicationHealthCheckTypeByNameAndSpaceCallCount() int {
	fake.setApplicationHealthCheckTypeByNameAndSpaceMutex.RLock()
	defer fake.setApplicationHealthCheckTypeByNameAndSpaceMutex.RUnlock()
	return len(fake.setApplicationHealthCheckTypeByNameAndSpaceArgsForCall)
}

func (fake *FakeSetHealthCheckActor) SetApplicationHealthCheckTypeByNameAndSpaceArgsForCall(i int) (string, string, string, string) {
	fake.setApplicationHealthCheckTypeByNameAndSpaceMutex.RLock()
	defer fake.setApplicationHealthCheckTypeByNameAndSpaceMutex.RUnlock()
	return fake.setApplicationHealthCheckTypeByNameAndSpaceArgsForCall[i].name, fake.setApplicationHealthCheckTypeByNameAndSpaceArgsForCall[i].spaceGUID, fake.setApplicationHealthCheckTypeByNameAndSpaceArgsForCall[i].healthCheckType, fake.setApplicationHealthCheckTypeByNameAndSpaceArgsForCall[i].httpEndpoint
}

func (fake *FakeSetHealthCheckActor) SetApplicationHealthCheckTypeByNameAndSpaceReturns(result1 v2action.Application, result2 v2action.Warnings, result3 error) {
	fake.SetApplicationHealthCheckTypeByNameAndSpaceStub = nil
	fake.setApplicationHealthCheckTypeByNameAndSpaceReturns = struct {
		result1 v2action.Application
		result2 v2action.Warnings
		result3 error
	}{result1, result2, result3}
}

func (fake *FakeSetHealthCheckActor) SetApplicationHealthCheckTypeByNameAndSpaceReturnsOnCall(i int, result1 v2action.Application, result2 v2action.Warnings, result3 error) {
	fake.SetApplicationHealthCheckTypeByNameAndSpaceStub = nil
	if fake.setApplicationHealthCheckTypeByNameAndSpaceReturnsOnCall == nil {
		fake.setApplicationHealthCheckTypeByNameAndSpaceReturnsOnCall = make(map[int]struct {
			result1 v2action.Application
			result2 v2action.Warnings
			result3 error
		})
	}
	fake.setApplicationHealthCheckTypeByNameAndSpaceReturnsOnCall[i] = struct {
		result1 v2action.Application
		result2 v2action.Warnings
		result3 error
	}{result1, result2, result3}
}

func (fake *FakeSetHealthCheckActor) CloudControllerAPIVersion() string {
	fake.cloudControllerAPIVersionMutex.Lock()
	ret, specificReturn := fake.cloudControllerAPIVersionReturnsOnCall[len(fake.cloudControllerAPIVersionArgsForCall)]
	fake.cloudControllerAPIVersionArgsForCall = append(fake.cloudControllerAPIVersionArgsForCall, struct{}{})
	fake.recordInvocation("CloudControllerAPIVersion", []interface{}{})
	fake.cloudControllerAPIVersionMutex.Unlock()
	if fake.CloudControllerAPIVersionStub != nil {
		return fake.CloudControllerAPIVersionStub()
	}
	if specificReturn {
		return ret.result1
	}
	return fake.cloudControllerAPIVersionReturns.result1
}

func (fake *FakeSetHealthCheckActor) CloudControllerAPIVersionCallCount() int {
	fake.cloudControllerAPIVersionMutex.RLock()
	defer fake.cloudControllerAPIVersionMutex.RUnlock()
	return len(fake.cloudControllerAPIVersionArgsForCall)
}

func (fake *FakeSetHealthCheckActor) CloudControllerAPIVersionReturns(result1 string) {
	fake.CloudControllerAPIVersionStub = nil
	fake.cloudControllerAPIVersionReturns = struct {
		result1 string
	}{result1}
}

func (fake *FakeSetHealthCheckActor) CloudControllerAPIVersionReturnsOnCall(i int, result1 string) {
	fake.CloudControllerAPIVersionStub = nil
	if fake.cloudControllerAPIVersionReturnsOnCall == nil {
		fake.cloudControllerAPIVersionReturnsOnCall = make(map[int]struct {
			result1 string
		})
	}
	fake.cloudControllerAPIVersionReturnsOnCall[i] = struct {
		result1 string
	}{result1}
}

func (fake *FakeSetHealthCheckActor) Invocations() map[string][][]interface{} {
	fake.invocationsMutex.RLock()
	defer fake.invocationsMutex.RUnlock()
	fake.setApplicationHealthCheckTypeByNameAndSpaceMutex.RLock()
	defer fake.setApplicationHealthCheckTypeByNameAndSpaceMutex.RUnlock()
	fake.cloudControllerAPIVersionMutex.RLock()
	defer fake.cloudControllerAPIVersionMutex.RUnlock()
	return fake.invocations
}

func (fake *FakeSetHealthCheckActor) recordInvocation(key string, args []interface{}) {
	fake.invocationsMutex.Lock()
	defer fake.invocationsMutex.Unlock()
	if fake.invocations == nil {
		fake.invocations = map[string][][]interface{}{}
	}
	if fake.invocations[key] == nil {
		fake.invocations[key] = [][]interface{}{}
	}
	fake.invocations[key] = append(fake.invocations[key], args)
}

var _ v2.SetHealthCheckActor = new(FakeSetHealthCheckActor)